// create simple heading that returns div
'use client';



interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center = false,
}) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-neutral-500 mt-2 font-light">{subtitle}</p>
        </div>
    );
};

export default Heading;
