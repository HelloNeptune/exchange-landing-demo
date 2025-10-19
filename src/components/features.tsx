import { Shield, Smartphone, Zap } from "lucide-react";
import { Card } from "./ui/card";
import styles from "./features.module.scss";

const features = [
  {
    icon: Shield,
    iconImage: '/shield.png',
    title: "SECURE",
    description:
      "Send money online fast, secure and easy. Live tracking and notifications • Flexible delivery and payment options.",
  },
  {
    icon: Smartphone,
    iconImage: '/phone.png',
    title: "EASY ACCESSIBLE",
    description:
      "Create a chart for any currency pair in the world to see their currency history. These currency charts use live mid-market rates, are easy to use, and are very reliable.",
  },
  {
    icon: Zap,
    iconImage: '/rocket.png',
    title: "FAST AND RELIABLE",
    description:
      "Need to know when a currency hits a specific rate? The Xe Rate Alerts will let you know when the rate you need is triggered on your selected currency pairs.",
  },
];

export function Features() {
  return (
    <section className={styles['features-section']}>
      <div className={`container ${styles['features-container']}`}>
        <div className={styles['features-grid']}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className={styles['feature-card']}
                title={feature.title}
                description={feature.description}
                iconImage={feature.iconImage}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}