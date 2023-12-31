import React from 'react';
import './style.scss'
interface CardProps {
    icon: string;
    title: string;
    subtitle: string;
    word: string;
}

const Card: React.FC<CardProps> = ({ icon, title, subtitle, word }) => {
    return (
        <div className="card">
            <div className="left-side">
                <img src={icon} alt="Icon" className="icon" />
            </div>
            <div className="center">
                <h2 className="title">{title}</h2>
                <p className="subtitle">{subtitle}</p>
            </div>
            <div className="right-side">
                <span className="word">{word}</span>
            </div>
        </div>
    );
};

export default Card;
