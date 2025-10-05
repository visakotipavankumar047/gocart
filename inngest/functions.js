import { inngest } from "./client";
import prisma from '@/lib/prisma'

// INNGEST Function to save user data to a database

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-creation" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  }
);

// INNGEST Function to update user data in the database
export const syncUserUpdation = inngest.createFunction(
  { id: "sync-user-update" },
  { event: "clerk/user.updated" },

  async ({ event }) => {
    const { data } = event;
    await prisma.user.update({
      data: {
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  }
);

// INNGEST Function to delete user data from the database

export const syncUserDeletion = inngest.createFunction(
  { id: "sync-user-delete" },
  { event: "clerk/user.delete" },

  async ({ event }) => {
    const { data } = event;
    await prisma.user.delete({
      data : {
        id: data.id,
      }
    });
  }
);
