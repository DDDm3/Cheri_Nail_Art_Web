import { ArrowUpRight } from "lucide-react";
import { teamMembers, text } from "../content";
import { pad2 } from "../utils";
import { BookLink } from "./BookingNotice";

/** About us: giới thiệu chung về tiệm, sau đó là thẻ riêng của từng thợ. */
export function Team() {
  return (
    <section id="about" className="about">
      <div className="team-section">
        <div className="team-image">
          <img src="/images/nail-artist.webp" alt="Nail technician at work" loading="lazy" decoding="async" />
        </div>
        <div className="team-copy">
          <span>About us</span>
          <h2>{text.team}</h2>
          <p>{text.teamText}</p>
          <div className="team-features">
            {text.teamFeatures.map((feature, index) => (
              <div key={feature}><b>{pad2(index + 1)}</b><span>{feature}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="members">
        <div className="section-heading">
          <span>Our team</span>
          <h2>{text.teamMembersTitle}</h2>
          <p>{text.teamMembersSub}</p>
        </div>
        <div className="member-grid">
          {teamMembers.map((member) => {
            const firstName = member.name.split(" ")[0];
            return (
              <article className="member-card" key={member.name}>
                {member.photo ? (
                  <img className="member-photo" src={member.photo} alt={member.name} loading="lazy" decoding="async" />
                ) : (
                  <div className="member-photo member-initials" aria-hidden>
                    {member.name.split(" ").map((part) => part[0]).join("")}
                  </div>
                )}
                <div className="member-body">
                  <span className="member-role">{member.role}</span>
                  <h3>{member.name}</h3>
                  <p>{member.bio}</p>
                  <blockquote>
                    “{member.quote.text}”
                    <cite>{member.quote.author}</cite>
                  </blockquote>
                  <BookLink className="book-button" href={member.bookingUrl}>
                    Book with {firstName} <ArrowUpRight size={14} aria-hidden />
                  </BookLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
