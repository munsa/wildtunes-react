import React from 'react';
import './Footer.css';
import {Col, Row} from 'react-bootstrap';
import WildTunes from '../../../shared/assets/image/wildtunes/logo/wildtunes_logo_small_white.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWrench} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faNodeJs, faReact, faBootstrap, faAws} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className='footer'>
      <Row className='footer-content'>
        <Col xs={{span: 6, order: 1}} md={{span: 2, order: 1}} className='footer-brand'>
          <img src={WildTunes} className='footer-brand-logo'/>
        </Col>
        <Col xs={{span: 12, order: 3}} md={{span: 8, order: 2}} className='footer-message'>
          <FontAwesomeIcon icon={faWrench}/> WildTunes is in a development stage. This is just a demo :)
        </Col>
        <Col xs={{span: 6, order: 2}} md={{span: 2, order: 3}} className='footer-github'>
          <a href='https://github.com/munsa' target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faNodeJs}/> <FontAwesomeIcon icon={faReact}/> <FontAwesomeIcon icon={faBootstrap}/> <FontAwesomeIcon icon={faAws}/> <FontAwesomeIcon icon={faGithub}/>
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;