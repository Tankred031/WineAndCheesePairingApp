import { Component } from "react";



class Card extends Component {
    render() {
        return (
            <div className="card shadow h-100 mx-auto" style={{ maxWidth: "17rem", width: "100%" }}>
                <img
                    src={this.props.img}
                    className="card-img-top"
                    alt={this.props.alt}
                    style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.text}</p>
                    <a
                     href={this.props.link}
                     target="_blank"
                     rel="noreferrer" 
                     className="btn btn-info mt-auto btn-bold-custom"
                     >{this.props.button}
                    </a>
                </div>
            </div>
        );
    }
}

export default Card;