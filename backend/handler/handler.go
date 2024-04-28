package handler

import (
	"attendance_congress/setting"
	"attendance_congress/usecase"
)

type AttendanceCongressHandler struct {
	studentUsecase   usecase.StudentUsecase
	connectionManger *setting.AttendanceConnectionManager
}

func NewAttendanceCongressHandler(
	studentUsecase usecase.StudentUsecase,
	connectionManger *setting.AttendanceConnectionManager,
) AttendanceCongressHandler {
	return AttendanceCongressHandler{
		studentUsecase: studentUsecase,
		connectionManger: connectionManger,
	}
}
