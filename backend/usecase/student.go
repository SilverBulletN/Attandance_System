package usecase

import (
	"attendance_congress/repository"
	"fmt"
	"time"
)

type StudentUsecase interface{
	GetStudent(studentID int) (*StudentInfo, error)
	CheckInOut(studentID int) (string, *StudentInfo, error)
	GetAllStudents() ([]*StudentInfo, error)
	GetInitStateAttendance() (*InitStateInfo, error)
}

type studentUsecaseImpl struct {
	studentRepository repository.StudentRepository
}

func NewStudentUsecase(studentRepository repository.StudentRepository) StudentUsecase {
	return &studentUsecaseImpl{
		studentRepository: studentRepository,
	}
}

type StudentInfo struct {
	StudentID   int    `json:"student_id"`
	Name string `json:"name"`
	Email       string `json:"email"`
	Sex         string `json:"sex"`
	Religion    string `json:"religion"`
	Nation      string `json:"Nation"`
	PhoneNumber string `json:"phone_number"`
	Class       string `json:"class"`
	Position    string `json:"position"`
	TypeDegate  string `json:"type_degate"`
	// this field for congress
	Seat       int       `json:"seat"`
	Checkin    bool      `json:"checkin"`
	CheckinAt  time.Time `json:"checkin_at"`
	Checkout   bool      `json:"checkout"`
	CheckoutAt time.Time `json:"checkout_at"`
}

func (u *studentUsecaseImpl) GetStudent(studentID int) (*StudentInfo, error) {
	students, err := u.studentRepository.Find(map[string]interface{}{
		"student_id": studentID,
	})
	if err != nil {
		return nil, err
	}
	return &StudentInfo{
		StudentID:   students[0].StudentID,
		Name: students[0].Name,
		Email:       students[0].Email,
		Sex:         students[0].Sex,
		Religion:    students[0].Religion,
		Nation:      students[0].Nation,
		PhoneNumber: students[0].PhoneNumber,
		Class:       students[0].Class,
		Position:    students[0].Position,
		TypeDegate:  students[0].TypeDegate,
		Seat:        students[0].Seat,
		Checkin:     *students[0].Checkin,
		CheckinAt:   students[0].CheckinAt,
		Checkout:    *students[0].Checkout,
		CheckoutAt:  students[0].CheckoutAt,
	}, nil
}

func (u *studentUsecaseImpl) CheckInOut(studentID int) (string, *StudentInfo, error) {
	students, err := u.studentRepository.Find(map[string]interface{}{
		"student_id": studentID,
	})
	if err != nil {
		return "", nil, err
	}
	student := students[0]
	result := ""
	if !*student.Checkin {
		*student.Checkin = true
		if err := u.studentRepository.Update(map[string]interface{}{
			"student_id": studentID,
		}, student); err != nil {
			return "", nil, err
		}
		result = "checkin"
	} else if !*student.Checkout {
		*student.Checkout = true
		if err := u.studentRepository.Update(map[string]interface{}{
			"student_id": studentID,
		}, student); err != nil {
			return "", nil, err
		}
		result = "checkout"
	} else {
		*student.Checkout = false
		if err := u.studentRepository.Update(map[string]interface{}{
			"student_id": studentID,
		}, student); err != nil {
			return "", nil, err
		}
		fmt.Print(student)
		result = "checkin"
	}

	return result, &StudentInfo{
		StudentID: student.StudentID,
		Name: student.Name,
		Class: student.Class,
		Seat: student.Seat,
	}, nil
}

func (u *studentUsecaseImpl) GetAllStudents() ([]*StudentInfo, error) {
	students, err := u.studentRepository.Find(nil)
	if err != nil {
		return nil, err
	}

	studentInfos := make([]*StudentInfo, 0)
	for _, student := range students {
		studentInfos = append(studentInfos, &StudentInfo{
			StudentID:   student.StudentID,
			Email:       student.Email,
			Sex:         student.Sex,
			Religion:    student.Religion,
			Nation:      student.Nation,
			PhoneNumber: student.PhoneNumber,
			Class:       student.Class,
			Position:    student.Position,
			TypeDegate:  student.TypeDegate,
			Seat:        student.Seat,
			Checkin:     *student.Checkin,
			CheckinAt:   student.CheckinAt,
			Checkout:    *student.Checkout,
			CheckoutAt:  student.CheckoutAt,
		})
	}

	return studentInfos, nil
}

type InitStateInfo struct {
	StudentInfo []*StudentInfo `json:"student_info"`
	Count int	`json:"count"`
}
func (u *studentUsecaseImpl) GetInitStateAttendance() (*InitStateInfo, error) {
	students, err := u.studentRepository.Find(map[string]interface{}{
		"checkin": true,
	})
	if err != nil {
		return nil, err
	}

	studentInfos := make([]*StudentInfo, 0)
	for _, student := range students {
		studentInfos = append(studentInfos, &StudentInfo{
			StudentID: student.StudentID,
			Name: student.Name,
			Class: student.Class,
			Seat: student.Seat,
		})
	}
	return &InitStateInfo{
		StudentInfo: studentInfos,
		Count: len(studentInfos),
	}, nil
}
