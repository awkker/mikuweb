package main

import (
	"fmt"
	"time"
	"net/http"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"os"            // 用于创建文件和目录
    "path/filepath" // 处理文件路径
    "strings"       // 处理文件名中的空格
)

//管理员
const ADMIN_PASSWORD = "123456"
//管理员昵称
const ADMIN_NICKNAME = "admin"

// 1. 升级 Model，增加元数据字段
type Comment struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Content   string    `json:"content"`
	Nickname  string    `json:"nickname"`   // 昵称 (为了演示，我们暂时随机或固定)
	IP        string    `json:"ip"`         // 记录 IP
	UserAgent string    `json:"user_agent"` // 记录浏览器 UA 字符串
	Location  string    `json:"location"`   // 记录大概位置 (实际项目需要 GeoIP 库，这里先存个占位)
	CreatedAt time.Time `json:"created_at"`
}

type Post struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Title     string    `json:"title"`
	Summary   string    `json:"summary"`
	Content   string    `json:"content" gorm:"type:text"` // 长文本`
	Tags      string    `json:"tags"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token != ADMIN_PASSWORD {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "权限不足喵！请输入管理员密码！"})
			return
		}
		c.Next()
	}
}

// saveToMDFile 把文章保存为 .md 文件
func saveToMDFile(post Post) error {
    // 1. 确保有个文件夹叫 "articles"
    // 如果没有，程序会自动创建一个
    dir := "md"
    if _, err := os.Stat(dir); os.IsNotExist(err) {
        os.Mkdir(dir, 0755)
    }

    // 2. 构造文件内容 (标准的 Front Matter 格式)
    // 这种格式 Hexo/Hugo/Obsidian 都能直接读
    fileContent := fmt.Sprintf(`---
title: %s
date: %s
tags: [%s]
summary: %s
---

%s
`, 
        post.Title,
        post.CreatedAt.Format("2006-01-02 15:04:05"), // 时间格式化
        post.Tags,
        post.Summary,
        post.Content, // 正文
    )

    // 3. 生成文件名：ID-标题.md
    // 为了防止标题里有斜杠 "/" 导致路径错误，简单替换一下
    safeTitle := strings.ReplaceAll(post.Title, "/", "-")
    safeTitle = strings.ReplaceAll(safeTitle, " ", "-") // 空格换横杠
    filename := fmt.Sprintf("%d-%s.md", post.ID, safeTitle)
    filePath := filepath.Join(dir, filename)

    // 4. 写入硬盘
    err := os.WriteFile(filePath, []byte(fileContent), 0644)
    if err != nil {
        return err
    }
    
    fmt.Printf("📝 文件已保存: %s\n", filePath)
    return nil
}

func main() {
	db, err := gorm.Open(sqlite.Open("data.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&Comment{}, &Post{})

	r := gin.Default()

	// CORS 配置：允许 DELETE 方法
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"} // 允许带鉴权头
	r.Use(cors.New(config))

	// ===========================
	//    A. 公开接口 (Public)
	// ===========================

	// --- 留言板相关 (读 + 写) ---
	r.GET("/comments", func(c *gin.Context) {
		var comments []Comment
		db.Order("created_at desc").Find(&comments)
		c.JSON(200, comments)
	})

	// POST: 发送评论 (自动记录 IP 和 UA)
	r.POST("/comments", func(c *gin.Context) {
		var jsonInput Comment
		if err := c.ShouldBindJSON(&jsonInput); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		// --- 自动收集信息 ---
		jsonInput.IP = c.ClientIP()
		jsonInput.UserAgent = c.Request.UserAgent()

		// 模拟位置 (真实的 IP 转城市需要引入 GeoIP 库，比较重，这里先模拟)
		// 如果是本地测试，IP 往往是 ::1 或 127.0.0.1
		jsonInput.Location = "来自 赛博坦星球"
		if jsonInput.IP == "::1" || jsonInput.IP == "127.0.0.1" {
			jsonInput.Location = "本地测试 (Localhost)"
		}

		// 默认昵称
		if jsonInput.Nickname == "" {
			jsonInput.Nickname = "神秘路人"
		}

		db.Create(&jsonInput)
		c.JSON(200, jsonInput)
	})

	// --- 博客相关 (只读) ---
	r.GET("/posts", func(c *gin.Context) {
		var posts []Post
		db.Select("id, title, summary, tags, created_at").Order("created_at desc").Find(&posts)
		c.JSON(200, posts)
	})

	r.GET("/posts/:id", func(c *gin.Context) {
		var post Post
		if err := db.First(&post, c.Param("id")).Error; err != nil {
			c.JSON(404, gin.H{"error": "文章不存在"})
			return
		}
		c.JSON(200, post)
	})

	// ===========================
	//    B. 管理员接口 (Admin Only)
	// ===========================
	admin := r.Group("/admin")
	admin.Use(AuthMiddleware())

	// POST: 创建文章
	admin.Use(AuthMiddleware()) // 这里的接口都需要密码！
	{
		// 发布文章
        admin.POST("/posts", func(c *gin.Context) {
            var input Post
            // 1. 解析前端发来的 JSON
            if err := c.ShouldBindJSON(&input); err != nil {
                c.JSON(400, gin.H{"error": err.Error()})
                return
            }

            // (可选) 自动生成摘要：如果没填摘要，截取正文前50个字
            if input.Summary == "" && len(input.Content) > 50 {
                // 这里简单按字符截取，中文可能会乱码，实际建议用 rune 处理
                // 但为了代码简单，先这样写
                input.Summary = string([]rune(input.Content)[:50]) + "..."
            } else if input.Summary == "" {
                input.Summary = input.Content
            }

            // 2. 【关键】先存入数据库！
            // 只有存入数据库后，GORM 才会给 input.ID 赋值
            // 我们生成文件名需要用到这个 ID
            result := db.Create(&input)
            if result.Error != nil {
                c.JSON(500, gin.H{"error": "数据库保存失败"})
                return
            }

            // 3. 【新增】调用工具函数，保存 MD 文件
            // 即使文件保存失败，也不影响数据库已经成功的状态，所以我们只打印日志
            if err := saveToMDFile(input); err != nil {
                fmt.Println("⚠️ MD 文件保存失败:", err)
            }

            // 4. 返回成功信息
            c.JSON(200, gin.H{
                "message": "发布成功！",
                "data":    input,
            })
        })
		
		admin.PUT("/posts/:id", func(c *gin.Context) {
			var post Post
			if err := db.First(&post, c.Param("id")).Error; err != nil {
				c.JSON(404, gin.H{"error": "文章不存在"})
				return
			}
			var input Post
			c.ShouldBindJSON(&input)
			db.Model(&post).Updates(input)
			c.JSON(200, post)
		})

		admin.DELETE("/posts/:id", func(c *gin.Context) {
			db.Delete(&Post{}, c.Param("id"))
			c.JSON(200, gin.H{"message": "文章已删除"})
		})

		// 删除评论 (重要改动：把删除评论移到了管理员权限里，防止路人乱删)
		// 如果你希望路人也能删，可以把这个移回上面的 Public 区域
		admin.DELETE("/comments/:id", func(c *gin.Context) {
			db.Unscoped().Delete(&Comment{}, c.Param("id"))
			c.JSON(200, gin.H{"message": "评论已删除"})
		})
	}

	fmt.Println("服务启动: http://localhost:8080")
	r.Run(":8080")
}