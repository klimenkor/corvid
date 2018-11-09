/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  shortid: string,
  email: string,
  labels?: Array< string | null > | null,
  cameras?: Array< string | null > | null,
  tier: string,
};

export type UpdateUserInput = {
  id: string,
  shortid?: string | null,
  email?: string | null,
  labels?: Array< string | null > | null,
  cameras?: Array< string | null > | null,
  tier?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateTierInput = {
  name: string,
};

export type UpdateTierInput = {
  id: string,
  name?: string | null,
};

export type DeleteTierInput = {
  id?: string | null,
};

export type CreateCameraInput = {
  shortid: string,
  name: string,
  active: boolean,
  userid: string,
};

export type UpdateCameraInput = {
  id: string,
  shortid?: string | null,
  name?: string | null,
  active?: boolean | null,
  userid?: string | null,
};

export type DeleteCameraInput = {
  id?: string | null,
};

export type CreateMotionInput = {
  labels?: Array< LabelInput | null > | null,
  frame: string,
  cameraid: string,
  userid: string,
};

export type LabelInput = {
  name?: string | null,
  confidence?: number | null,
};

export type UpdateMotionInput = {
  id: string,
  labels?: Array< LabelInput | null > | null,
  frame?: string | null,
  cameraid?: string | null,
  userid?: string | null,
};

export type DeleteMotionInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  shortid?: ModelStringFilterInput | null,
  email?: ModelStringFilterInput | null,
  labels?: ModelStringFilterInput | null,
  cameras?: ModelIDFilterInput | null,
  tier?: ModelIDFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelTierFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelTierFilterInput | null > | null,
  or?: Array< ModelTierFilterInput | null > | null,
  not?: ModelTierFilterInput | null,
};

export type ModelCameraFilterInput = {
  id?: ModelIDFilterInput | null,
  shortid?: ModelStringFilterInput | null,
  name?: ModelStringFilterInput | null,
  active?: ModelBooleanFilterInput | null,
  userid?: ModelStringFilterInput | null,
  and?: Array< ModelCameraFilterInput | null > | null,
  or?: Array< ModelCameraFilterInput | null > | null,
  not?: ModelCameraFilterInput | null,
};

export type ModelBooleanFilterInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelMotionFilterInput = {
  id?: ModelIDFilterInput | null,
  frame?: ModelStringFilterInput | null,
  cameraid?: ModelIDFilterInput | null,
  userid?: ModelIDFilterInput | null,
  and?: Array< ModelMotionFilterInput | null > | null,
  or?: Array< ModelMotionFilterInput | null > | null,
  not?: ModelMotionFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    shortid: string,
    email: string,
    labels: Array< string | null > | null,
    cameras: Array< string | null > | null,
    tier: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    shortid: string,
    email: string,
    labels: Array< string | null > | null,
    cameras: Array< string | null > | null,
    tier: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    shortid: string,
    email: string,
    labels: Array< string | null > | null,
    cameras: Array< string | null > | null,
    tier: string,
  } | null,
};

export type CreateTierMutationVariables = {
  input: CreateTierInput,
};

export type CreateTierMutation = {
  createTier:  {
    __typename: "Tier",
    id: string,
    name: string,
  } | null,
};

export type UpdateTierMutationVariables = {
  input: UpdateTierInput,
};

export type UpdateTierMutation = {
  updateTier:  {
    __typename: "Tier",
    id: string,
    name: string,
  } | null,
};

export type DeleteTierMutationVariables = {
  input: DeleteTierInput,
};

export type DeleteTierMutation = {
  deleteTier:  {
    __typename: "Tier",
    id: string,
    name: string,
  } | null,
};

export type CreateCameraMutationVariables = {
  input: CreateCameraInput,
};

export type CreateCameraMutation = {
  createCamera:  {
    __typename: "Camera",
    id: string,
    shortid: string,
    name: string,
    active: boolean,
    userid: string,
  } | null,
};

export type UpdateCameraMutationVariables = {
  input: UpdateCameraInput,
};

export type UpdateCameraMutation = {
  updateCamera:  {
    __typename: "Camera",
    id: string,
    shortid: string,
    name: string,
    active: boolean,
    userid: string,
  } | null,
};

export type DeleteCameraMutationVariables = {
  input: DeleteCameraInput,
};

export type DeleteCameraMutation = {
  deleteCamera:  {
    __typename: "Camera",
    id: string,
    shortid: string,
    name: string,
    active: boolean,
    userid: string,
  } | null,
};

export type CreateMotionMutationVariables = {
  input: CreateMotionInput,
};

export type CreateMotionMutation = {
  createMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    cameraid: string,
    userid: string,
  } | null,
};

export type UpdateMotionMutationVariables = {
  input: UpdateMotionInput,
};

export type UpdateMotionMutation = {
  updateMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    cameraid: string,
    userid: string,
  } | null,
};

export type DeleteMotionMutationVariables = {
  input: DeleteMotionInput,
};

export type DeleteMotionMutation = {
  deleteMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    cameraid: string,
    userid: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    shortid: string,
    email: string,
    labels: Array< string | null > | null,
    cameras: Array< string | null > | null,
    tier: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      shortid: string,
      email: string,
      labels: Array< string | null > | null,
      cameras: Array< string | null > | null,
      tier: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTierQueryVariables = {
  id: string,
};

export type GetTierQuery = {
  getTier:  {
    __typename: "Tier",
    id: string,
    name: string,
  } | null,
};

export type ListTiersQueryVariables = {
  filter?: ModelTierFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTiersQuery = {
  listTiers:  {
    __typename: "ModelTierConnection",
    items:  Array< {
      __typename: "Tier",
      id: string,
      name: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCameraQueryVariables = {
  id: string,
};

export type GetCameraQuery = {
  getCamera:  {
    __typename: "Camera",
    id: string,
    shortid: string,
    name: string,
    active: boolean,
    userid: string,
  } | null,
};

export type ListCamerasQueryVariables = {
  filter?: ModelCameraFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCamerasQuery = {
  listCameras:  {
    __typename: "ModelCameraConnection",
    items:  Array< {
      __typename: "Camera",
      id: string,
      shortid: string,
      name: string,
      active: boolean,
      userid: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetMotionQueryVariables = {
  id: string,
};

export type GetMotionQuery = {
  getMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    cameraid: string,
    userid: string,
  } | null,
};

export type ListMotionsQueryVariables = {
  filter?: ModelMotionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMotionsQuery = {
  listMotions:  {
    __typename: "ModelMotionConnection",
    items:  Array< {
      __typename: "Motion",
      id: string,
      labels:  Array< {
        __typename: "Label",
        name: string | null,
        confidence: number | null,
      } | null > | null,
      frame: string,
      cameraid: string,
      userid: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    shortid: string,
    email: string,
    labels: Array< string | null > | null,
    cameras: Array< string | null > | null,
    tier: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    shortid: string,
    email: string,
    labels: Array< string | null > | null,
    cameras: Array< string | null > | null,
    tier: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    shortid: string,
    email: string,
    labels: Array< string | null > | null,
    cameras: Array< string | null > | null,
    tier: string,
  } | null,
};

export type OnCreateTierSubscription = {
  onCreateTier:  {
    __typename: "Tier",
    id: string,
    name: string,
  } | null,
};

export type OnUpdateTierSubscription = {
  onUpdateTier:  {
    __typename: "Tier",
    id: string,
    name: string,
  } | null,
};

export type OnDeleteTierSubscription = {
  onDeleteTier:  {
    __typename: "Tier",
    id: string,
    name: string,
  } | null,
};

export type OnCreateCameraSubscription = {
  onCreateCamera:  {
    __typename: "Camera",
    id: string,
    shortid: string,
    name: string,
    active: boolean,
    userid: string,
  } | null,
};

export type OnUpdateCameraSubscription = {
  onUpdateCamera:  {
    __typename: "Camera",
    id: string,
    shortid: string,
    name: string,
    active: boolean,
    userid: string,
  } | null,
};

export type OnDeleteCameraSubscription = {
  onDeleteCamera:  {
    __typename: "Camera",
    id: string,
    shortid: string,
    name: string,
    active: boolean,
    userid: string,
  } | null,
};

export type OnCreateMotionSubscription = {
  onCreateMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    cameraid: string,
    userid: string,
  } | null,
};

export type OnUpdateMotionSubscription = {
  onUpdateMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    cameraid: string,
    userid: string,
  } | null,
};

export type OnDeleteMotionSubscription = {
  onDeleteMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    cameraid: string,
    userid: string,
  } | null,
};
