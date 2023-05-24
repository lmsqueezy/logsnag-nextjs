import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Lemon Squeezy x LogSnag',
};

export default function Page() {
  return (
    <div className="container">
      <h1>Lemon Squeezy x LogSnag</h1>
      <p>Send webhook events to LogSnag.</p>
      <ul>
        <li>
          <a href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>e-reader</title><g stroke-width="1" fill="none" stroke="#777777" stroke-linecap="round" stroke-linejoin="round"><line x1="4.5" y1="3.5" x2="11.5" y2="3.5" stroke="#777777"></line> <line x1="4.5" y1="6.5" x2="11.5" y2="6.5" stroke="#777777"></line> <line x1="4.5" y1="9.5" x2="7.5" y2="9.5" stroke="#777777"></line> <rect x="1.5" y="0.5" width="13" height="15" rx="1" ry="1"></rect> <line x1="1.5" y1="12.5" x2="14.5" y2="12.5"></line></g></svg>
            Read the tutorial
          </a>
        </li>
        <li>
          <a href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>code</title><g stroke-width="1" fill="none" stroke="#777777" stroke-linecap="round" stroke-linejoin="round"><polyline points="5.5 3 .5 8 5.5 13"></polyline><polyline points="10.5 13 15.5 8 10.5 3" stroke="#777777"></polyline></g></svg>
            Get the code on Github
          </a>
        </li>
      </ul>
    </div>
  );
}