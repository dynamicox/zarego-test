interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "w-full h-20" }) => {
  return (
    <div
      data-testid="skeleton-element"
      className={`bg-gray-700 rounded-md animate-pulse ${className}`}
    />
  );
};

export default Skeleton;
