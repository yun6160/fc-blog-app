import { Link } from "react-router-dom";
import { useState } from "react";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export default function SignupForm() {
    const [errors, setErrors] = useState<{ email?: string; password?: string; passwordConfirm?: string }>({});

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success("회원가입이 완료되었습니다🎉");
        } catch (error: any) {
            toast.error(error?.code);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "email") {
            setEmail(value);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex?.test(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, email: "이메일 형식이 올바르지 않습니다." }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
            }
        }
        if (name === "password") {
            setPassword(value);

            if (value?.length < 8) {
                setErrors((prevErrors) => ({ ...prevErrors, password: "비밀번호는 8자 이상이어야 합니다." }));
            } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: "비밀번호가 일치하지 않습니다. 다시 확인해주세요.",
                }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
            }
        }
        if (name === "password_confirm") {
            setPasswordConfirm(value);

            if (value?.length < 8) {
                setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: "비밀번호는 8자 이상이어야 합니다." }));
            } else if (value !== password) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    passwordConfirm: "비밀번호가 일치하지 않습니다. 다시 확인해주세요.",
                }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: "" }));
            }
        }
    };

    return (
        <form onSubmit={onSubmit} className='form form--lg'>
            <h1 className='form__title'>회원가입</h1>
            <div className='form__block'>
                <label htmlFor='email'>이메일</label>
                <input type='email' id='email' name='email' required onChange={onChange} />
                {errors.email && (
                    <div className='form__block'>
                        <div className='form__error'>{errors.email}</div>
                    </div>
                )}
            </div>
            <div className='form__block'>
                <label htmlFor='password'>비밀번호</label>
                <input type='password' id='password' name='password' required onChange={onChange} />
                {errors.password && (
                    <div className='form__block'>
                        <div className='form__error'>{errors.password}</div>
                    </div>
                )}
            </div>
            <div className='form__block'>
                <label htmlFor='password_confirm'>비밀번호 확인</label>
                <input type='password' id='password_confirm' name='password_confirm' required onChange={onChange} />
                {errors.passwordConfirm && (
                    <div className='form__block'>
                        <div className='form__error'>{errors.passwordConfirm}</div>
                    </div>
                )}
            </div>
            <div className='form__block'>
                계정이 이미 있으신가요?
                <Link to='/login' className='form__link'>
                    로그인하기
                </Link>
            </div>
            <div className='form__block'>
                <input
                    type='submit'
                    value='회원가입'
                    className='form__btn--submit'
                    disabled={Object.values(errors).some((error) => error.length > 0)}
                />
            </div>
        </form>
    );
}
