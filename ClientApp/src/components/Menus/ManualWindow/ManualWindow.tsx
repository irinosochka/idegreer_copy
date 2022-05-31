import React, {FC} from 'react';
import './manualWindow.css';

import signUp from '../../../assets/img/manual/sign-up.png';
import signIn from '../../../assets/img/manual/sign-in.png';
import mainPage from '../../../assets/img/manual/main-page.png';
import leftNav from '../../../assets/img/manual/left-nav.png';
import rightBlock from '../../../assets/img/manual/right-block.png';
import course from '../../../assets/img/manual/course.png';
import cart from '../../../assets/img/manual/cart.png';
import payment from '../../../assets/img/manual/payment.png';

interface ManualWindow {
    active: boolean,
    setActive: (bool: boolean) => void,
}

const ManualWindow: FC<ManualWindow> = ({active, setActive}) => {

    return (
        <div onClick={() => setActive(false)} className={active ? "manual__wrapper active" : "manual__wrapper"}>
            <div onClick={e => e.stopPropagation()} className={active ? "manual__main active" : "manual__main"}>

                <nav className="nav__steps">
                    <a href="#1">Sign up</a>
                    <a href="#2">Sign in</a>
                    <a href="#3">Main page</a>
                    <a href="#4">Left menu</a>
                    <a href="#5">User</a>
                    <a href="#6">Course</a>
                    <a href="#7">Cart</a>
                    <a href="#8">Payment</a>
                    <p className="close-window" onClick={() => setActive(false)}>&#x2715;</p>
                </nav>

                <div className="content">
                    <section id="1" className="section">
                        <h2 className="section__header">Registration</h2>
                        <div className="section__content">
                            <div className="section__img">
                                <img className="vertical" src={signUp} alt="sign-up"/>
                            </div>
                            <div className="section__txt">
                                <p>To start using our application you need to register.
                                    Enter your first and last name, email, login and come up with a password.</p>
                            </div>
                        </div>
                    </section>

                    <section id="2" className="section">
                        <h2 className="section__header">Logging in</h2>
                        <div className="section__content">
                            <div className="section__img">
                                <img className="vertical" src={signIn} alt="sign-up"/>
                            </div>

                            <div className="section__txt">
                                <p>After registration you can log in. In the login window, enter your data: login and password</p>
                            </div>
                        </div>
                    </section>

                    <section id="3" className="section">
                        <h2 className="section__header">The main page of application</h2>
                        <div className="section__content">
                            <img className="section__img horizontal" src={mainPage} alt="sign-up"/>
                        </div>
                    </section>

                    <section id="4" className="section">
                        <h2 className="section__header">Left menu</h2>
                        <div className="section__content">
                            <div className="section__img">
                                <img className="vertical" src={leftNav} alt="sign-up"/>
                            </div>
                            <div className="section__txt">
                                <p>
                                    This is the main menu of the application. It has the following tabs:
                                    <ul>
                                        <li className="p-item"><span className="p-span">Course catalog</span> - here you will find all available courses</li>
                                        <li className="p-item"><span className="p-span">Your courses</span> - here you will find all the courses you bought</li>
                                        <li className="p-item"><span className="p-span">Course list</span> - here is a list of your own courses</li>
                                        <li className="p-item"><span className="p-span">Add course</span> - here you can add your own course</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="5" className="section">
                        <h2 className="section__header">User's data panel</h2>
                        <div className="section__content">
                            <div className="section__img">
                                <img className="vertical" src={rightBlock} alt="right-block"/>
                            </div>
                            <div className="section__txt">
                                <p>This block consists of two parts</p>
                                <p>The upper part contains your data. You can change it by pressing the pencil button. You can also change the password by pressing the lock button.</p>
                                <p>The lower part contains information about changes in the course</p>
                            </div>
                        </div>
                    </section>

                    <section id="6" className="section">
                        <h2 className="section__header">Choose a course and add it to the cart</h2>
                        <div className="section__content">
                            <img className="section__img horizontal" src={course} alt="sign-up"/>
                        </div>
                    </section>

                    <section id="7" className="section">
                        <h2 className="section__header">Сart with added courses</h2>
                        <div className="section__content">
                            <img className=" section__img horizontal" src={cart} alt="sign-up"/>
                        </div>
                    </section>

                    <section id="8" className="section">
                        <h2 className="section__header">Payment</h2>
                        <div className="section__content">
                            <div className="section__img">
                                <img className="vertical" src={payment} alt="sign-up"/>
                            </div>
                            <div className="section__txt">
                                <p>After adding the courses to the cart, you need to pay for the order.
                                    To do this, click the button to GO TO PAYMENT.
                                    In this window you need to enter your card details and then click PAY.
                                </p>
                                <p>
                                    Congratulations, you have purchased courses. We wish you productive learning
                                </p>
                            </div>
                        </div>
                    </section>

                </div>

            </div>
        </div>
    );
};

export default ManualWindow;