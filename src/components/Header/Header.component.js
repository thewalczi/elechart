import React, { useContext } from 'react';
import { ChartDataContext } from '../../contexts/ChartData.context';

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <div className="logo-icon">
                    <div className="logo-icon-north">
                        <div className="logo-icon-bar logo-icon-bar-1"></div>
                        <div className="logo-icon-bar logo-icon-bar-2"></div>
                        <div className="logo-icon-bar logo-icon-bar-3"></div>
                        <div className="logo-icon-bar logo-icon-bar-4"></div>
                        <div className="logo-icon-bar logo-icon-bar-5"></div>
                        <div className="logo-icon-bar logo-icon-bar-6"></div>
                        <div className="logo-icon-bar logo-icon-bar-7"></div>
                    </div>
                    <div className="logo-icon-south">
                        <div className="logo-icon-bar logo-icon-bar-1"></div>
                        <div className="logo-icon-bar logo-icon-bar-2"></div>
                        <div className="logo-icon-bar logo-icon-bar-3"></div>
                        <div className="logo-icon-bar logo-icon-bar-4"></div>
                        <div className="logo-icon-bar logo-icon-bar-5"></div>
                        <div className="logo-icon-bar logo-icon-bar-6"></div>
                        <div className="logo-icon-bar logo-icon-bar-7"></div>
                    </div>
                </div>
                <div className="logo-text">
                    elechart
                </div>
            </div>
        </div>
    );
}
 
export default Header;


// const { data } = useContext(ChartDataContext);
//     return (
//         <div>
//             {data.map(item => {
//                 return (
//                     <div key={item.id}>{`${item.name} ${item.value}`}</div>
//                 )
//             })}
//         </div>
//     );