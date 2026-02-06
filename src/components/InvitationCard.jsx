import invitationImage from '/Users/MZ/Project/invitation-web/src/assets/invitepic.png'

function InvitationCard() {
  return (
    <section>
      <img 
        src={invitationImage} 
        alt="Invitación María Magdalena 70 años" 
        style={{ width: '100%', borderRadius: '12px' }}
      />
    </section>
  )
}

export default InvitationCard
