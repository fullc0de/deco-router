import { RoutableFunction } from "./common-interfaces";


export interface ControllerInterface {
    /** 
     * Handling 'GET /'
    */
    index?: RoutableFunction;

    /** 
     * Handling 'GET /:id'
    */
    show?: RoutableFunction;

    /** 
     * Handling 'PUT /:id'
    */
    put?: RoutableFunction;

    /** 
     * Handling 'POST /'
    */
    post?: RoutableFunction;

    /** 
     * Handling 'DELETE /:id'
    */
    delete?: RoutableFunction;
};