# Notification Audit

The portfolio already includes a custom Cloud/DevOps-style `SystemNotice` component with information, success, and error states. It currently appears for resume downloads, LinkedIn navigation, GitHub navigation, and form-submission outcomes. The next refinement will surface the same branded feedback when visitors open direct contact actions, so every high-value handoff has clear system-state confirmation.

The direct-contact actions now route to Gmail Compose in a separate tab with Sahil’s address, subject, and greeting prefilled. They also trigger the amber action-state notice, “Gmail compose opening,” in the portfolio tab so visitors receive immediate feedback before composing their message.

The resume download control uses the same system-notice framework with a success state. Its click handler reports that the resume download has been initiated and directs visitors to their downloads folder, while the browser retains the native file-download behavior.
