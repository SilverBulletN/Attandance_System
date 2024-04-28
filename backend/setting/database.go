package setting

import (
	"attendance_congress/model"
	"fmt"
	"os"

	//"github.com/tealeg/xlsx"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func GetDB() *gorm.DB {
	return db
}

func InitDB() {
	// database config const
	var (
		hostname       = os.Getenv("DB_HOSTNAME")
		username       = os.Getenv("DB_USERNAME")
		port           = os.Getenv("DB_PORT")
		dbName         = os.Getenv("DB_NAME")
		dbPassword     = os.Getenv("DB_PASSWORD")
		SSLMode        = "prefer"
		ConnectTimeout = "10"
	)
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s connect_timeout=%s",
		hostname, username, dbPassword, dbName, port, SSLMode, ConnectTimeout)

	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("can't connect to database")
	}

	migrateDB()
	//initData()
}

// migrateDB will create table of all models in database by autoMigrate from Gorm
func migrateDB() {
	err := db.AutoMigrate(&model.Student{})
	if err != nil {
		panic("fail to migrate database")
	}
}

// initData will initial data if there is not record in db
// func initData() {
// 	dataPathFile := os.Getenv("STUDENT_DATA_PATH")
// 	studentsDataFile, err := xlsx.OpenFile(dataPathFile)
// 	if err != nil {
// 		panic(err)
// 	}

// 	sheet := studentsDataFile.Sheets[0]

// 	for _, row := range sheet.Rows[1:] {

// 		studentID := row.Cells[1].String()
// 		// fmt.Print(studentIDString)
// 		// studentID, err := strconv.Atoi(studentIDString)
// 		if err != nil {
// 			fmt.Println("Error converting student ID:", err) // Add logging
// 			panic(err)
// 		}

// 		student := model.Student{
// 			ID:     studentID,
// 			Name:   row.Cells[0].String(),
// 			School: row.Cells[2].String(),
// 			// IsComittee:      row.Cells[4].String() == "Ban tổ chức",
// 			IsCheckin:       false,
// 			IsCheckout:      false,
// 			IsLuckyAttendee: false,
// 		}

// 		if err = db.Save(&student).Error; err != nil {
// 			continue
// 		}
// 	}

// 	blackListPath := os.Getenv("BLACK_LIST_PATH")
// 	blackListFile, err := xlsx.OpenFile(blackListPath)
// 	if err != nil {
// 		panic(err)
// 	}

// 	sheet = blackListFile.Sheets[0]
// 	for _, row := range sheet.Rows[1:] {

// 		studentID := row.Cells[0].String()
// 		// fmt.Print(studentIDString)
// 		// studentID, err := strconv.Atoi(studentIDString)

// 		var student model.Student
// 		if err = db.First(&student, studentID).Error; err != nil {
// 			continue
// 		}
// 		student.IsComittee = true

// 		if err = db.Save(&student).Error; err != nil {
// 			continue
// 		}
// 	}
// }
