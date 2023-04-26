<template>
  <div class="list">
    <ul>
      <li v-for="item in items" :key="item.id" class="list-item">
        <div class="list-item-right">
          <h4 class="list-item-title">{{ item.title }}</h4>
          <p class="list-item-description">{{ item.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FourthPage',

  data() {
    return {
      items: [
        {
          id: 1,
          title: 'Albums mobile app',
          description:
            'A mobile application designed for music enthusiasts to manage and organize their albums. The app allows users to create playlists, search for albums, and view detailed information about their favorite artists and albums.',
        },
        {
          id: 2,
          title: 'Employee manager',
          description:
            'An application designed for businesses to manage their employees. The app allows managers to view employee information, track their attendance, manage payroll, and assign tasks to different employees.',
        },
        {
          id: 3,
          title: 'Information stack app',
          description:
            "An application designed to help users keep track of their information sources. The app allows users to organize their information sources such as news articles, blog posts, and research papers in one place. The app can also recommend new information sources based on the user's interests.",
        },
        {
          id: 4,
          title: 'Cryptotracker',
          description:
            'A mobile application designed for cryptocurrency enthusiasts to keep track of their investments. The app allows users to view the latest cryptocurrency prices, track their portfolio, and receive real-time alerts for market changes.',
        },
        {
          id: 5,
          title: 'Password manager',
          description:
            'A desktop application designed to help users manage their passwords. The app securely stores passwords for different websites and applications, and allows users to generate strong passwords and autofill login credentials.',
        },
        {
          id: 6,
          title: 'Vaccination web app',
          description:
            'A web application designed to help users schedule and manage their vaccinations. The app allows users to view available vaccination appointments, schedule their appointments, and receive reminders for their upcoming appointments.',
        },
        {
          id: 7,
          title: 'Birthday App',
          description:
            'A mobile application designed to help users remember birthdays and other important events. The app allows users to add birthdays to a calendar, set reminders for upcoming events, and send personalized messages to friends and family.',
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  padding: 20px;
}

.list-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.list-item-left {
  flex: 0 0 150px;
  height: 100%;
}

.list-item-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.list-item-right {
  flex: 1;
  padding: 10px;
}

.list-item-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.list-item-description {
  margin: 0;
  font-size: 1rem;
}
</style>
