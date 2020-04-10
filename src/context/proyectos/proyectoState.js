import React, { useReducer } from "react";

import uuid from "uuid";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTOS,
  VALIDAR_FORMULARIO,
} from "../../types";

const ProyectoState = (props) => {
  const proyectos = [
    { id: 1, nombre: "Tienda Virtual" },
    { id: 2, nombre: "Intranet" },
    { id: 3, nombre: "Diseño de sitio web" },
  ];

  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario: false,
  };
  /* Dispatch para ejecutar las acciones */
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  /* Serie de funciones para el CRUD */
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  /* Obtener los proyectos */
  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos,
    });
  };

  /* Agregar nuevo proyecto */
  const agregarProyecto = (proyecto) => {
    proyecto.id = uuid.v4();

    /* Insertar el proyecto en el state */
    dispatch({
      type: AGREGAR_PROYECTOS,
      payload: proyecto,
    });
  };
  /* VAlida el formulario por errores */
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorFormulario: state.errorFormulario, 
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};
export default ProyectoState;
