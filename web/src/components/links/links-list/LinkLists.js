
import React from "react";
import LinkItem from '../link-item/LinkItem';
import linksService from '../../../services/links-service';
import LinkCreator from '../link-creator/LinkCreator';


class LinkList extends React.Component {
state = {
    url:"",
    links:[],
    isLoading:true
}
fetchLinks(){
    linksService.list()
    .then(links => this.setState({ links, isLoading: false }))
    .catch(error => {
        this.setState({ isLoading: false })
        console.error(error)
      });
}
componentDidMount() {
    this.fetchLinks();
}
handleCreateLink(link) {
    this.setState(({ links }) => ({
      links: [link, ...links]
    }))
}
render(){
    const { links, isLoading } = this.state;

    return (
        links &&
            <>
                <div className="row mb-2">
                    <div className="col">
                        <LinkCreator onCreateLink={(link) => this.handleCreateLink(link)}/>
                    </div>
                </div>
                {isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
                    <div className="row mb-2">
                    <div className="col">
                        <ul className="list-group">
                        {links.map(link =>
                            <li key={link.id} className="list-group-item list-group-item-action">
                                <LinkItem {...link}/>
                            </li>
                        )}
                        </ul>
                    </div>
                    </div>
                )}
            </>
    )
}


}

export default LinkList