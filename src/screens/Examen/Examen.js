import * as React from 'react';
import styles from './Examen.module.scss';
import WebServices from '../../WebServices/WebServices';
import { async } from 'q';

import Table from '../../components/Table/Table';
import cashoutHeader from '../../resources/jsons/cashoutHeader.json';
import cashoutData from '../../resources/jsons/cashoutData.json';
import { IconTable, IconChart } from '../../resources/svg/Icons';
import produce from 'immer/dist/immer';
import SimpleBarChart from '../../components/Chart/SimpleBarChart';
import StackedBarChart from '../../components/Chart/StackedBarChart';
import {BarChart,  Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



export default (class Examen extends React.PureComponent {
    state = {
        response: {},
        data:[
            {
                "name":'Oaxaca',
                "temp":21,
                "humidity":29,
                "pressure":23
            }
        ],
        value: '',
        name: '',
        temp: '',
        humidity: '',
        pressure:''
    };

	componentDidMount() {
	}

    fetchData = async(url) =>{

        try{
            const response = await WebServices.getByCityId({
                cityId: url,
            });
  
            this.setState({ name: response.name, temp: response.main.temp, humidity: response.main.humidity, pressure: response.main.pressure });

            const nextState = produce(this.state, (draft) => {
                draft.response = response;
            });

            this.setState(nextState);

        }catch (e){

        }
    }
    
    showData = () => {
        var url =  this.state.value;
        this.fetchData(url);
    }  

    onRemoveInputChange= (event)=>{
        const valor = event.target.value;
        this.setState({value: valor});
    }

    newRow = () => {
        const nextState = produce(this.state, (draft)=> {
            draft.data.push({
                name:this.state.name,
                temp:this.state.temp,
                humidity:this.state.humidity,
                pressure:this.state.pressure,
            });
        })

        this.setState(nextState);

    } 
    
	render() {
        const {response, data}= this.state;

		const iconUrl = response && response.weather && 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png';

        return (

			<div className={styles.main}>
                <ul>

                    URL: <input type="text" name="txt_url" id="txt_url" size="150" value= {this.state.value} onChange={(event) => this.onRemoveInputChange(event)}/>
                    <br></br>
                    <br></br>
                    
                    <li key={1} className={styles.country} onClick={()=> this.showData()}>BYCITYID</li>
                    <li key={2} className={styles.country} onClick={()=> this.showData()}>BYCITYNAME</li>
                    <li key={3} className={styles.country} onClick={()=> this.showData()}>BYCOORDINATES</li>
                </ul>
                
                <ul>
                    <li>NAME: {response && response.weather && response.name}</li>
                    <li>TEMP: {response && response.main && response.main.temp}</li>
                    <li>HUMIDITY: {response && response.main && response.main.pressure}</li>
                    <li>PRESSURE: {response && response.main && response.main.humidity}</li>				
                </ul>
                <img src={iconUrl} alt="" />

                <button onClick={ ()=> this.newRow() } >
					NEW
                </button>

                <br></br>
                <br></br>

                <table>
                    <tbody>

                    <tr>
                        <th>NAME</th>
                        <th>TEMP</th>
                        <th>HUMIDITY</th>
                        <th>PRESSURE</th>
                    </tr>

                    {data.map((reg, i) => {
                        return (
                            <tr key={i}>
                                <td>{reg.name}</td>
                                <td>{reg.temp}</td>
                                <td>{reg.humidity}</td>
                                <td>{reg.pressure}</td>
                            </tr>
                        );
                    })}


                    </tbody>
                </table>
                <div className={styles.chart}>
                    {
                        console.log('data',data)
                    }
                    <BarChart
                        width={700}
                        height={500}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="temp" fill="#8884d8" />
                        <Bar dataKey="humidity" fill="#82ca9d" />
                        <Bar dataKey="pressure" fill="#BC8F8F" />
                    </BarChart>                
                </div>
            </div>
		);
	}
});