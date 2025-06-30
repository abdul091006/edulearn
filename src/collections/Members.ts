import { CollectionConfig } from 'payload';

const Members: CollectionConfig = {
  slug: 'members',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'dateOfBirth',
      type: 'date',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

export default Members;
