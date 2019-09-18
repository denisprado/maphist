'use strict';

const User = use('App/Models/User')
const Kue = use('Kue')
const Job = use('App/Jobs/InvitationEmail')

const InviteHook = (exports = module.exports = {})

InviteHook.sendInvitationEmail = async invite => {
  const { email } = invite

  const invited = await User.findBy('email', email)

  if (invited) {
    await invited.teams().attach(invite.team_id)
  } else {
    const user = await invite.user().fetch()
    const team = await invite.team().fetch()

    const job = Kue.dispatch(
      Job.key,
      { user, team, email },
      { priority: 'high', attempts: 3 }
    )

    const result = await job.result
    console.log(result)
  }
}
