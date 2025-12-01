package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// 1. 定义评论的数据结构 (Model)
type Comment struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}

func main() {
	// 2. 连接数据库 (会在当前目录自动生成 comments.db 文件)
	db, err := gorm.Open(sqlite.Open("comments.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// 自动迁移模式：确保数据库表结构和 Struct 保持一致
	db.AutoMigrate(&Comment{})

	// 3. 设置 Web 服务器 (Gin)
	r := gin.Default()

	// 4. 配置 CORS (跨域)
	// 重要！因为你的网页可能运行在 localhost:5500，而后端在 localhost:8080，
	// 不加这个浏览器会拦截请求。
	r.Use(cors.Default())

	// 5. 写接口 API

	// GET /comments - 获取所有评论
	r.GET("/comments", func(c *gin.Context) {
		var comments []Comment
		// 按时间倒序找所有评论
		db.Order("created_at desc").Find(&comments)
		c.JSON(200, comments)
	})

	// POST /comments - 提交新评论
	r.POST("/comments", func(c *gin.Context) {
		var jsonInput Comment
		// 尝试把前端发的 JSON 数据绑定到结构体上
		if err := c.ShouldBindJSON(&jsonInput); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		// 保存到数据库
		db.Create(&jsonInput)
		c.JSON(200, jsonInput)
	})

	// 6. 启动服务器，默认端口 8080
	r.Run(":8080")
}