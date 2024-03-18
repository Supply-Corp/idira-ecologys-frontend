import {  MenuRoute } from "@interfaces/menu"
import { Roles } from "@interfaces/roles"

  const AnunciosRoute: MenuRoute = {
    title:'Anuncios',
    icon:'speed',
    url:'/home',
    extact:true
  };

  const CategoriasRoute: MenuRoute = {
    title:'Directorios',
    icon:'category',
    url:'/home/categories',
    extact:false
  };

  const EmpresasRoute: MenuRoute = {
    title:'Empresas',
    icon:'factory',
    url:'/home/companies',
    extact:false
  }

  const UsuariosRoute: MenuRoute = {
    title:'Usuarios',
    icon:'group',
    url:'/home/users',
    extact:false
  }

  const DocumentosRoute: MenuRoute = {
    title:'Documentos',
    icon:'folder',
    url:'/home/documents',
    extact:false
  }

  const ActividadesMensualesRoute: MenuRoute = {
    title:'Actividades Mensuales',
    icon:'auto_stories',
    url:'/home/activities',
    extact:false
  }

  const PerfilRoute: MenuRoute = {
    title:'Datos de Perfil',
    icon:'person',
    url:'/home/profile',
    extact:false
  }

  const AdminRoutes:MenuRoute[] = [
    AnunciosRoute,
    CategoriasRoute,
    EmpresasRoute,
    UsuariosRoute,
    DocumentosRoute,
    ActividadesMensualesRoute,
    PerfilRoute
  ];

  const CompanyRoutes:MenuRoute[] = [
    AnunciosRoute,
    EmpresasRoute,
    DocumentosRoute,
    PerfilRoute
  ];

  const SedeRoutes:MenuRoute[] = [
    AnunciosRoute,
    DocumentosRoute,
    ActividadesMensualesRoute,
    PerfilRoute
  ];

  export const menuRoute ={
    [Roles.ADMIN]:AdminRoutes,
    [Roles.USER]:CompanyRoutes,
    [Roles.SEDE]:SedeRoutes
  }
