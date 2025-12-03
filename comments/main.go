package main

import (
	"fmt"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

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

func main() {
	db, err := gorm.Open(sqlite.Open("comments.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&Comment{})

	r := gin.Default()

	// CORS 配置：允许 DELETE 方法
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "DELETE", "OPTIONS"}
	r.Use(cors.New(config))

	// GET: 获取评论
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

	// DELETE: 删除评论
	r.DELETE("/comments/:id", func(c *gin.Context) {
		id := c.Param("id")
		// 物理删除 (Unscoped)，或者你可以用软删除
		result := db.Unscoped().Delete(&Comment{}, id)

		if result.Error != nil {
			c.JSON(500, gin.H{"error": result.Error.Error()})
			return
		}
		c.JSON(200, gin.H{"message": "deleted"})
	})

	fmt.Println("服务启动: http://localhost:8080")
	r.Run(":8080")
}