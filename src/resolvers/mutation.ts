import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';
import _ from 'lodash';


const mutation: IResolvers = {
    Mutation: {
        cursoNuevo(_: void, { curso }): any {
            const itemCurso = {
                id: String(database.cursos.length + 1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews: []

            }
            if (database.cursos.filter(item => item.title === itemCurso.title).length === 0) {
                
                database.cursos.push(itemCurso);
                return itemCurso;
            }

            return  {
                id: '-1',
                title: "El curso ya existe con este titulo",
                description: "",
                clases: -1,
                time: 0.0,
                level: "TODOS",
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            }


        }, 
        modificarCurso(_:void, {curso}): any {
            const elementoExiste =  database.cursos.findIndex(function(e) {
                return e.id === curso.id
            });
           if(elementoExiste > -1 ){
               const valoraciones = database.cursos[elementoExiste].reviews;
               curso.reviews = valoraciones;
               database.cursos[elementoExiste] = curso;
            return curso;
            }
            return  {
                id: '-1',
                title: "El curso no existe en la BD",
                description: "",
                clases: -1,
                time: 0.0,
                level: "TODOS",
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            }

        }, 
        eliminarCurso(_:void, {id}): any{
            const elementoExiste =  database.cursos.findIndex(function(e) {
                return id === e.id
                
                
            });
            
           if(elementoExiste > -1 ){
             
            database.cursos.splice(elementoExiste, 1)
               return id;
            }
            return  {
                id: '-1',
                title: "El curso no existe en la BD",
                description: "",
                clases: -1,
                time: 0.0,
                level: "TODOS",
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            }

        }
    }
}
export default mutation;