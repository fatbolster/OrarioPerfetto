import React from "react";

interface SidebarProps {
  sections: {
    title: string;
    content: React.ReactNode;
    combinedContent?: React.ReactNode; // Optional combined content for two-div mode
  }[];
  layoutMode: "three-div" | "two-div"; // Prop to control layout mode
}

const Sidebar: React.FC<SidebarProps> = ({ sections, layoutMode }) => {
  const isTwoMode = layoutMode === "two-div"; // Check layout mode

  return (
    <div style={styles.sidebar}>
      {/* Top Section */}
      <div style={styles.topSection}>
        <h3 style={styles.sectionTitle}>{sections[0].title}</h3>
        <div>{sections[0].content}</div>
      </div>

      <div style={styles.divider}></div>

      {/* Middle and Bottom Sections */}
      {isTwoMode ? (
        // Combined Mode: Display merged content
        <div style={styles.combinedSection}>
          <h3 style={styles.sectionTitle}>{sections[1].title}</h3>
          <div>{sections[1].combinedContent || sections[1].content}</div>
        </div>
      ) : (
        // Separate Mode: Full Content for Middle and Bottom
        <div style={styles.flexContainer}>
          <div style={styles.flexItem}>
            <h3 style={styles.sectionTitle}>{sections[1].title}</h3>
            <div>{sections[1].content}</div>
          </div>
          {/* Divider Between Middle and Bottom Sections */}
          <div style={styles.divider}></div>
          <div style={styles.flexItem}>
            <h3 style={styles.sectionTitle}>{sections[2].title}</h3>
            <div>{sections[2].content}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  sidebar: {
    top: 0,
    left: 0,
    width: "250px",
    height: "100vh",
    backgroundColor: "#fff",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    padding: "12px",
    boxSizing: "border-box" as "border-box",
    display: "flex",
    flexDirection: "column" as "column",
    color: "black",
  },
  topSection: {
    marginBottom: "20px",
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#ddd",
    margin: "10px 0",
  },
  flexContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as "column",
  },
  flexItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: "10px",
  },
  combinedSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};

export default Sidebar;
