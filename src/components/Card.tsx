import React from "react";
import Image from "next/image";

interface CardProps {
	image: string;
	title: string;
	content: string;
	category: string;
	type: string;
}

const Card: React.FC<CardProps> = ({
	image,
	title,
	content,
	category,
	type,
}) => {
	return (
		<div className="col-span-1 h-fit border border-gray-300 bg-gray-100">
			<img className="mb-4" src={image} alt={title} />
			<h2 className="font-bold text-lg px-4">{title}</h2>
			<p className="px-4 py-2">{content}</p>
			<p className="bg-white border-y-2 px-4 py-2">{category}</p>
			<p className="bg-white px-4 py-2">{type}</p>
		</div>
	);
};

export default Card;
