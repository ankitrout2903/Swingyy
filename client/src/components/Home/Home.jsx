import './style.css';
import Hello from './hello.gif';

export default function Home(){
    return (
        <><img src={Hello} alt="" />
        <div className="home">Welcome to Swingy Chat app!!</div>
        </>
    )
}