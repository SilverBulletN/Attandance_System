package setting

import (
	"attendance_congress/usecase"
	"fmt"

	"github.com/gorilla/websocket"
)

type AttendanceConnectionManager struct {
	clients    map[*websocket.Conn]bool
	register   chan *websocket.Conn
	unregister chan *websocket.Conn
	broadcast  chan AttendanceMassage
}

type AttendanceMassage struct {
	StudentInfo usecase.StudentInfo	`json:"student_info"`
	Result      string `json:"result"`
}

func NewConnectionManager() AttendanceConnectionManager {
	return AttendanceConnectionManager{
		clients:    make(map[*websocket.Conn]bool),
		register:   make(chan *websocket.Conn),
		unregister: make(chan *websocket.Conn),
		broadcast:  make(chan AttendanceMassage),
	}
}

func (manager *AttendanceConnectionManager) Start() {
	for {
		select {
		case connection := <-manager.register:
			manager.clients[connection] = true
		case connection := <-manager.unregister:
			if _, ok := manager.clients[connection]; ok {
				delete(manager.clients, connection)
				connection.Close()
			}
		case message := <-manager.broadcast:
			for connection := range manager.clients {
				fmt.Print(message)
				fmt.Println(&message)
				err := connection.WriteJSON(message)
				if err != nil {
					connection.Close()
					delete(manager.clients, connection)
				}
			}
		}
	}
}

func (manager *AttendanceConnectionManager) AddClient(client *websocket.Conn) {
	// manager.clients[client] = true
	manager.register <- client
}

func (manager *AttendanceConnectionManager) RemoveClient(client *websocket.Conn) {
	// delete(manager.clients, client)
	manager.unregister <- client
}

func (manager *AttendanceConnectionManager) AddMessage(student *usecase.StudentInfo, result string) {
	// fmt.Print(*student)
	manager.broadcast <- AttendanceMassage{*student, result}
}
