package repository

import (
	"attendance_congress/model"

	"gorm.io/gorm"
)

type StudentRepository interface {
	Create(student *model.Student) error
	Find(conditionMap map[string]interface{}) ([]*model.Student, error)
	Delete(conditionMap map[string]interface{}) error
	Update(conditionMap map[string]interface{}, student *model.Student) error
}

type studentRepositoryImpl struct {
	db *gorm.DB
}

func NewStudentRepository(db *gorm.DB) StudentRepository {
	return &studentRepositoryImpl{
		db: db,
	}
}

func (repo *studentRepositoryImpl) Create(student *model.Student) error {
	return repo.db.Create(student).Error
}

func (repo *studentRepositoryImpl) Find(conditionMap map[string]interface{}) ([]*model.Student, error) {
	var students []*model.Student
	err := repo.db.Where(conditionMap).Find(&students).Error
	if err != nil {
		return nil, err
	}
	return students, err
}

func (repo *studentRepositoryImpl) Delete(conditionMap map[string]interface{}) error {
	return repo.db.Where(conditionMap).Delete(&model.Student{}).Error
}

func (repo *studentRepositoryImpl) Update(conditionMap map[string]interface{}, student *model.Student) error {
	return repo.db.Where(conditionMap).Updates(student).Error
}
