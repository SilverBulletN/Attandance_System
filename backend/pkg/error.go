package pkg

type ServiceError struct {
	Code    int
	Message string
}

func (s ServiceError) Error() string {
	return s.Message
}

func (s ServiceError) ErrorCode() int {
	return s.Code
}

func NewCustomError(errCode int, errMsg string) ServiceError {
	return ServiceError{
		Code:    errCode,
		Message: errMsg,
	}
}

func ParseError(err error) ServiceError {
	if serviceError, ok := err.(ServiceError); ok {
		return serviceError
	}
	return GeneralFailure
}

var (
	GeneralFailure = ServiceError{Code: 1000, Message: "general failure"}
	BindingFailure = ServiceError{Code: 1001, Message: "binding failure"}
	InvalidData    = ServiceError{Code: 1002, Message: "invalid data"}
)
