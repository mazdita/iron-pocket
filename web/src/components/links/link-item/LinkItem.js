
import moment from 'moment';
import { Link } from 'react-router-dom';
import './LinkItem.css';


function LinkItem({id, url, title, description, image, keywords, createdAt}) {
    return (
        <div className="LinkItem card mb-4 mx-4">
            <div className="row g-0">
                <div className="col-md-3">
                    <img src={image} className="img-fluid rounded-start" alt={title}/>
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">{moment(createdAt).fromNow()}</small></p>
                        <Link to={`/${id}`} className="stretched-link"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LinkItem;