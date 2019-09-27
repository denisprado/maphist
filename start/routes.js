'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/sessions', 'SessionController.store').validator('Session')
Route.post('/users', 'UserController.store').validator('User')
Route.get('/users', 'UserController.index')
Route.post('/projects/:id/files', 'FileController.store')
Route.get('/projects/:id/files', 'FileController.index')

Route.group(() => {
  Route.get('roles', 'RoleController.index')
  Route.resource('teams', 'TeamController')
    .apiOnly()
    .validator(new Map([[['teams.store', 'teams.update'], ['Team']]]))
}).middleware('auth')

Route.group(() => {
  Route.post('invites', 'InviteController.store')
    .validator('Invite')
    .middleware('can:invites_create')

  Route.resource('projects', 'ProjectController').apiOnly()
  Route.get('members', 'MemberController.index')
  Route.put('members/:id', 'MemberController.update').middleware(
    'is:administrator'
  )
  Route.get('permissions', 'PermissionController.show')
  Route.get('/files/:id', 'FileController.show')
}).middleware(['auth', 'team'])
