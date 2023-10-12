import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
    const breadcrumbs = useSelector(state => state.breadcrumbs);
    console.log(breadcrumbs)
    return (
        <div>
            {breadcrumbs.map((breadcrumb, index) => (
                <span key={index}>
                    {index !== 0 && " > "}
                    <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
                </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;