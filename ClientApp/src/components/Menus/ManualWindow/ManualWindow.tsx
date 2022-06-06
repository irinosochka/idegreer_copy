import React, {FC, useState} from 'react';
import './manualWindow.css';

import signUp from '../../../assets/img/manual/sign-up.png';
import signIn from '../../../assets/img/manual/sign-in.png';
import mainPage from '../../../assets/img/manual/main-page.png';
import leftNav from '../../../assets/img/manual/left-nav.png';
import rightBlock from '../../../assets/img/manual/right-block.png';
import course from '../../../assets/img/manual/course.png';
import cart from '../../../assets/img/manual/cart.png';
import payment from '../../../assets/img/manual/payment.png';
import addCourse from '../../../assets/img/manual/add-course.png';
import yourCourses from '../../../assets/img/manual/your-courses.png';
import manageCourse from '../../../assets/img/manual/manage-course.png';

interface ManualWindow {
    active: boolean,
    setActive: (bool: boolean) => void,
}

const ManualWindow: FC<ManualWindow> = ({active, setActive}) => {

    const [manualState, setManualState] = useState({
        activeLink: null,
        links: [
            {id: 1, content: 'Sign up'},
            {id: 2, content: 'Sign in'},
            {id: 3, content: 'Main page'},
            {id: 4, content: 'Left menu'},
            {id: 5, content: 'User'},
            {id: 6, content: 'Course'},
            {id: 7, content: 'Cart'},
            {id: 8, content: 'Payment'}]
    })

    const [profManualState, setProfManualState] = useState({
        activeLink: null,
        links: [
            {id: 1, content: 'Sign up'},
            {id: 2, content: 'Sign in'},
            {id: 3, content: 'Main page'},
            {id: 4, content: 'Left menu'},
            {id: 5, content: 'User'},
            {id: 9, content: 'Create course'},
            {id: 10, content: 'Your courses'},
            {id: 11, content: 'Manage course'}]
    })

    const [studentManual, setStudentManual] = useState(true);

    function toggleActive(index: any) {
        // @ts-ignore
        setManualState({ ...manualState, activeLink: manualState.links[index]});
    }

    function toggleProfActive(index: any) {
        // @ts-ignore
        setProfManualState({ ...profManualState, activeLink: profManualState.links[index]});
    }

    function toggleActiveStyles(index: any) {
        if (manualState.links[index] === manualState.activeLink) {
            return "a-active";
        } else {
            return "inactive";
        }
    }

    function toggleProfActiveStyles(index: any) {
        if (profManualState.links[index] === profManualState.activeLink) {
            return "a-active";
        } else {
            return "inactive";
        }
    }

    return (
        <div onClick={() => setActive(false)} className={active ? "manual__wrapper active" : "manual__wrapper"}>
            <div onClick={e => e.stopPropagation()} className={active ? "manual__main active" : "manual__main"}>

                <nav className="nav__steps">
                    {studentManual ?
                        <li><p className="w-user" onClick={() => setStudentManual(false)}>For professors</p></li>
                        : <li><p className="w-user" onClick={() => setStudentManual(true)}>For students</p></li>}

                    {studentManual && manualState.links.map((link, index) => (
                        <li key={index}>
                            <a key={index+13} href={`#${link.id}`} className={toggleActiveStyles(index)} onClick={() => {toggleActive(index)}}>{link.content}</a>
                        </li>
                    ))}

                    {!studentManual && profManualState.links.map((link, index) => (
                        <li key={index}>
                            <a key={index+10} href={`#${link.id}`} className={toggleProfActiveStyles(index)} onClick={() => {toggleProfActive(index)}}>{link.content}</a>
                        </li>
                    ))}

                    <li><p className="close-window" onClick={() => setActive(false)}>&#x2715;</p></li>
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
                                <img className="vertical-lg" src={leftNav} alt="sign-up"/>
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
                                <img className="vertical-lg" src={rightBlock} alt="right-block"/>
                            </div>
                            <div className="section__txt">
                                <p>This block consists of two parts</p>
                                <p>The upper part contains your data. You can change it by pressing the pencil button. You can also change the password by pressing the lock button.</p>
                                <p>The lower part contains information about changes in the course</p>
                            </div>
                        </div>
                    </section>

                    {studentManual && <section id="6" className="section">
                        <h2 className="section__header">Choose a course and add it to the cart</h2>
                        <div className="section__content">
                            <img className="section__img horizontal" src={course} alt="sign-up"/>
                        </div>
                    </section>}

                    {studentManual && <section id="7" className="section">
                        <h2 className="section__header">Сart with added courses</h2>
                        <div className="section__content">
                            <img className=" section__img horizontal" src={cart} alt="sign-up"/>
                        </div>
                    </section>}

                    {studentManual && <section id="8" className="section">
                        <h2 className="section__header">Payment</h2>
                        <div className="section__content">
                            <div className="section__img">
                                <img className="vertical-slg" src={payment} alt="sign-up"/>
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
                    </section>}

                    {!studentManual && <section id="9" className="section">
                        <h2 className="section__header">Adding a new course</h2>
                        <div className="section__content">
                            <div className="section__img">
                                <img className="square" src={addCourse} alt="sign-up"/>
                            </div>
                            <div className="section__txt">
                                <p>
                                    To add a new course you need to enter its name, topic, price and description. Then click the ADD COURSE button.
                                </p>
                                <p>
                                    You can then find this course in the menu on the left by clicking on the Course List.
                                </p>
                            </div>
                        </div>
                    </section>}

                    {!studentManual && <section id="10" className="section">
                        <h2 className="section__header">Page with your own courses</h2>
                        <div className="section__content">
                            <div className="section__content">
                                <img className="section__img horizontal" src={yourCourses} alt="sign-up"/>
                            </div>
                        </div>
                    </section>}

                    {!studentManual && <section id="11" className="section">
                        <h2 className="section__header">Manage your courses</h2>
                        <div className="section__content">
                            <div className="section__img">
                                <img className="square" src={manageCourse} alt="sign-up"/>
                            </div>
                            <div className="section__txt">
                                <p>
                                    In this window you can manage your own courses. You can:
                                    <ul>
                                        <li className="p-item"><span className="p-span">Edit course</span> - you can change the name, theme, price and description</li>
                                        <li className="p-item"><span className="p-span">Add lecture</span> - you can add lectures to the course</li>
                                        <li className="p-item"><span className="p-span">Edit lecture</span> - you can change the title of the lecture, the description and the link to the video</li>
                                        <li className="p-item"><span className="p-span">Members</span> - here you can view the participants of your course</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </section>}

                </div>

            </div>
        </div>
    );
};

export default ManualWindow;
