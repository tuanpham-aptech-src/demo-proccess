const user = {
    name: "An",
    age: 17,
    email: "an@example.com"
};


const validateUser = (userInfo) => {
    const errors = []
    // name không được rỗng
    if (typeof userInfo.name !== 'string' || !userInfo.name.trim()) {
        errors.push('name không được rỗng')
    }
    // age phải >= 18
    if (typeof userInfo.age !== 'number' || userInfo.age < 18) {
        errors.push('age tối thiểu là 18')
    }
    // email phải chứa ký tự @
    if (typeof userInfo.email !== 'string' || !userInfo.email.includes('@')) {
        errors.push('email phải chứa ký tự @')
    }
    const err = errors
    // Kiểm tra xem có lỗi nào không bằng cách kiểm tra độ dài mảng
    if (errors.length) {
        return {
            passed: false,
            data: null,
            err
        }
    }
    return {
        passed: true,
        data: userInfo,
        message: null
    }
}

const formValidate1 = validateUser(user)
const formValidate2 = validateUser({
    name: "Tuấn",
    age: 18,
    email: "tuan@example.com"
})
const formValidate3 = validateUser({
    name: "Minh",
    age: 18,
    email: "minhexample.com"
})

console.log(formValidate1);
console.log(formValidate2);
console.log(formValidate3);
