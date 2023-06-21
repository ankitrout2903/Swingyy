import './style.css';
import Hello from './hello.gif';

export default function Home(){
    return (
        <><div className="home">Welcome to Swinngy Chat app!!</div>
        <img src={Hello} alt="" /></>
    )
}