<template>
  <v-row>
    <v-col v-for="n in 10" :key="n" cols="12" md="4" sm="6">
      <v-card>
        <v-img
          height="100"
          src="https://random.imagecdn.app/500/150"
          cover
          class="text-white"></v-img>
        <v-card-title>Titolo</v-card-title>
        <v-card-subtitle>Sottotitolo</v-card-subtitle>
        <v-card-text
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
          repellendus eius, itaque deserunt repellat odio saepe numquam quos
          molestiae doloremque sunt quod fugit libero quia unde autem aspernatur
          neque voluptatibus!</v-card-text
        >
        <v-card-actions>
          <v-btn>Action 1</v-btn>
          <v-btn>Action 2</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
