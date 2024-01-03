import React from 'react';
import { SvgIcon } from "@mui/material";

import './style.scss'
interface CardProps {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    word: string;
    isSelected: boolean | null;
    onClick: () => void
}

const Card: React.FC<CardProps> = ({ icon, title, subtitle, word, isSelected, onClick }) => {
    const cardClasses = `card ${isSelected ? 'selected' : ''}`;

    return (
        <div className={cardClasses} onClick={onClick}>
            <div className="left-side">
                <SvgIcon component={icon} className='icon' />
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
