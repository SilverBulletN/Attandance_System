package main

import (
	"attendance_congress/handler"
	"attendance_congress/repository"
	"attendance_congress/setting"
	"attendance_congress/usecase"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Print("fail to load .env file")
	}

	setting.InitDB()
	db := setting.GetDB()

	studentRepository := repository.NewStudentRepository(db)
	studentUsecase := usecase.NewStudentUsecase(studentRepository)

	connectionManager := setting.NewConnectionManager()
	go connectionManager.Start()

	attendanceCongressHandler := handler.NewAttendanceCongressHandler(studentUsecase, &connectionManager)

	router := gin.Default()
	api := router.Group("/api")
	{
		students := api.Group("/students")
		students.GET("/get-init-state", attendanceCongressHandler.GetInitState)
		students.GET("/get-all-students", attendanceCongressHandler.GetAllStudents)
		students.GET("/ws", attendanceCongressHandler.AttendanceRealtimeConnection)
		students.PUT("/checkin-out", attendanceCongressHandler.CheckInOut)
	}

	router.Run(":8080")
}
