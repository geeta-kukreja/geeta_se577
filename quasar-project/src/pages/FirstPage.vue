<template>

  <div class="card horizontal">
    <div class="card-body">
      <div class="row">
        <div class="col-sm-4">
          <img src="../icon.jpeg" class="card-img" alt="...">
        </div>
        <div class="col-sm-8">
          <div>
      <h3>Hi! I am Geeta Kukreja</h3>
    </div>
          <p class="card-text">I am a dedicated graduate student pursuing a Masters in Computer Science at Drexel University. With a strong passion for innovation and technology, I am learning and exploring in various domains such as Artificial Intelligence, Machine Learning, Software Engineering, and Application Development. Besides academics, I am a firm believer in giving back to society and strive to make a positive impact through my actions.
</p>
        </div>
      </div>
    </div>
  </div>


</template>

<script lang="ts">
export default {
  name: 'SecondPage',
};
</script>

<script setup lang="ts">
//Most code goes here
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card.horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card.horizontal .card-header {
  width: 25%;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  background-color: #f5f5f5;
  border-right: 1px solid #dee2e6;
}

.card.horizontal .card-body {
  width: 75%;
}

.card-img {
  width: 100%;
  height: auto;
}
</style>
