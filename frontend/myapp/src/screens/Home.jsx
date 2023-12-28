import React from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useState } from 'react'




export default function Home() {



    const [TravelData, setTravelData] = useState({ startingLocation: "", Destination: "", Milage: 12, VehicleType: "2AxlesAuto" });
    const [RouteInfo, setRouteInfo] = useState({ Route: "", TotalCost: 0, Tolls: 0, Distance: 0 });

    const onChange = (event) => {
        setTravelData({ ...TravelData, [event.target.name]: event.target.value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Include parameters in the URL for a GET request
          const url = `http://localhost:3000/api/calculatetoll?startinglocation=${encodeURIComponent(TravelData.startingLocation)}&destination=${encodeURIComponent(TravelData.Destination)}&milage=${encodeURIComponent(TravelData.Milage)}&vehicletype=${encodeURIComponent(TravelData.VehicleType)}`;
        
          // Define the axios request configuration
          const dataTravel = {
            method: 'GET',
            url: url,
            headers: {
              'content-type': 'application/json'
            }
          };
        
          // Use axios to make the request to the backend 
          const response = await axios(dataTravel);
      
          // Assuming fuel, minimumTollCost, and metric are properties in the API response
          const routeInfo = {
            Route: response.data.routes[0].summary.name,
            TotalCost: response.data.routes[0].costs.fuel + response.data.routes[0].costs.minimumTollCost,
            Tolls: response.data.routes[0].costs.minimumTollCost,
            Distance: response.data.routes[0].summary.distance.metric
          };
      
          // Set route information in state
          setRouteInfo(routeInfo);
        } catch (error) {
          console.error('Error fetching data:', error.message);
          // Handle the error as needed
        }
      };
    return (
        <div><Navbar />


            <div className="container position-relative p-5 m-5 fw-bold bg-dark">

                <form className='text-center m-4' onSubmit={handleSubmit}>
                    <div className="row m-4">
                        <div className="col text-white">
                            Source
                            <input type="text" className="form-control m-4" placeholder="From" name="startingLocation" value={TravelData.startingLocation} onChange={onChange} />
                        </div>
                        <div className="col text-white bg-dark">
                            Destination
                            <input type="text" className="form-control m-4" placeholder="To" name="Destination" value={TravelData.Destination} onChange={onChange} />
                        </div>
                        <div className="col text-white bg-dark">
                            Milage of Vehicle (Km/L)
                            <input type="number" className="form-control m-4" placeholder="Milage" name="Milage" value={TravelData.Milage} onChange={onChange} />
                        </div>
                        <div className="col text-white bg-dark">
                            <label >Select Vehicle Type</label>
                            <select className="form-control m-4" id="exampleFormControlSelect1" name="VehicleType" value={TravelData.VehicleType} onChange={onChange}>
                                <option value='2AxlesAuto'>Car, Jeep, Van, SUV</option>
                                <option value='4AxlesAuto'>Bus</option>
                                <option value='4AxlesBus'>Truck</option>
                                <option value='2AxlesLCV'>Pickup truck, Light Commercial Vehicles</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Calculate Travel Cost</button>
                </form>




                <div className="container m-2 border">

                    <table className="table">
                        <thead>
                            <tr>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                                <td>Start</td>
                                <td className='text-end'>{TravelData.startingLocation}</td>

                            </tr>
                            <tr>

                                <td>Destination</td>
                                <td className='text-end'>{TravelData.Destination}</td>

                            </tr>
                            <tr>
                                <td>Route</td>
                                <td className='text-end'>{RouteInfo.Route}</td>

                            </tr>
                            <tr>
                                <td>Total Tolls(INR)</td>
                                <td className='text-end'>{RouteInfo.Tolls}</td>

                            </tr>

                            <tr>
                                <td>Distance</td>
                                <td className='text-end'>{RouteInfo.Distance}</td>

                            </tr>
                            <tr>
                                <td>Total Cost(INR)</td>
                                <td className='text-end'>{RouteInfo.TotalCost}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>






        </div>
    )
}
