interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12'
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className={`${sizeClasses[size]} rounded-full bg-skin-text flex items-center justify-center transition-colors duration-200`}>
                <span className="text-skin-primary font-display font-bold text-sm">
                    HL
                </span>
            </div>
        </div>
    );
};

export default Logo;
