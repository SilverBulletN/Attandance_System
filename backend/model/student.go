package model

import "time"

type Student struct {
	Id          int `gorm:"primaryKey"`
	StudentID   int
	Name string
	Email       string
	Sex         string
	Religion    string
	Nation      string
	PhoneNumber string
	Class       string
	Position    string
	TypeDegate  string
	// this field for congress
	Seat      int
	Checkin   *bool
	CheckinAt time.Time
	Checkout  *bool
	CheckoutAt time.Time
}