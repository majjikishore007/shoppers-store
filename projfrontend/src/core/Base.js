import React from 'react';
import Menu from './menu';
const Base = ({
  title = 'My title',
  description = 'My description',
  className = ' text-white p-4',
  children,
}) => {
  return (
    <div>
      <Menu></Menu>
      <div className="content">
        <div className="container-fulid">
          <div className="jumbotron  text-white text-center">
            <h2 className="diplay-4">{title}</h2>
            <p className="lead">{description}</p>
          </div>
          <div className={className}>{children}</div>
        </div>
      </div>
      <footer>
        <div className="container-fluid  text-white text-center">
          <h2>If you got any questions feel free to reach out!</h2>
          <button className="btn btn-warning btn-lg px-3 mt">Contact us</button>
        </div>
        <div className="container mt-auto">
          <span className="text-muted">
            an amazing <span className="text-white">Mern</span> bootcamp
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
