const guestPassword = process.env.REACT_APP_GUEST_PASSWORD || 'zxc';

const guestAdminEmail = process.env.REACT_APP_GUEST_ADMIN_EMAIL || 'yogendra@12';
const guestTeacherEmail = process.env.REACT_APP_GUEST_TEACHER_EMAIL || 'tony@12';
const guestStudentRollNum = process.env.REACT_APP_GUEST_STUDENT_ROLLNUM || '1';
const guestStudentName = process.env.REACT_APP_GUEST_STUDENT_NAME || 'Dipesh Awasthi';

export const getGuestLoginFields = (role) => {
    if (role === 'Admin') {
        return { email: guestAdminEmail, password: guestPassword };
    }

    if (role === 'Teacher') {
        return { email: guestTeacherEmail, password: guestPassword };
    }

    if (role === 'Student') {
        return {
            rollNum: guestStudentRollNum,
            studentName: guestStudentName,
            password: guestPassword,
        };
    }

    return null;
};