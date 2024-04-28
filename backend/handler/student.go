package handler

import (
	"attendance_congress/pkg"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var wsUprader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// This function use for create connection between client and attendance socket
// Endpoint: [WS] /api/students/ws
// No body message needed
func (h *AttendanceCongressHandler) AttendanceRealtimeConnection(c *gin.Context) {
	conn, err := wsUprader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		responseBadRequestError(c, pkg.BindingFailure)
		return
	}
	defer conn.Close()

	h.connectionManger.AddClient(conn)
	defer h.connectionManger.RemoveClient(conn)

	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			log.Print("websocket disconnected")
			break
		}
	}
}

type CheckInOutReq struct {
	StudentID int `json:"student_id"`
}
// This function use to checkin or checkout student and send message to socket register
//
// Endpoint: [PUT] /api/students/checkin-out
//
// Request body: {"student_id"}
//
// Response:
// 		- 200 OK: data {"result", "student_info": {"student_id", "name", "class", "seat"}}
// 		- 500: server error
// 		- 400 -> 1001: binding failure (maybe because of type of student_id is not int)
func (h *AttendanceCongressHandler) CheckInOut(c *gin.Context) {
	var req CheckInOutReq
	if err := c.ShouldBind(&req); err != nil {
		responseBadRequestError(c, pkg.BindingFailure)
		return
	}

	result, student, err := h.studentUsecase.CheckInOut(req.StudentID)
	if err != nil {
		responseServerError(c, pkg.ParseError(err))
		return
	}

	h.connectionManger.AddMessage(student, result)
	responseSuccess(c, "200 ok")
}

// 	This function is used to get init state of numbers student checkin and list of them
// 
// 	Endpoint: [GET] /api/students/get-init-state
// 
// 	Request body: none
//
// 	Response: 
// 		- 200 OK: data {"count", "student_info": [{"student_id", "name", "class", "seat"}]}
//		- 500: server error
func (h *AttendanceCongressHandler) GetInitState(c *gin.Context) {
	initStateInfo, err := h.studentUsecase.GetInitStateAttendance()
	if err != nil {
		responseServerError(c, pkg.ParseError(err))
		return
	}

	responseSuccess(c, initStateInfo)
}

// This function is used to get list all of student (include checkin or not)
// 
// Endpoint: [GET] /api/students/get-all-students
//
// Request body: none
// 
// Response:
//		- 200 OK: data [{"student_id", "name", "class", "seat", "sex", "religion", "nation", "email", "phone_number", "position", "type_degate", "checkin", "checkout"}]
func (h *AttendanceCongressHandler) GetAllStudents(c *gin.Context) {
	students, err := h.studentUsecase.GetAllStudents()
	if err != nil {
		responseServerError(c, pkg.ParseError(err))
		return
	}

	responseSuccess(c, students)
}
