import Router from 'next/router';
import {
  Button,
  Box,
  Text as TextChakra,
  Input,
  FormLabel,
  Alert,
  Skeleton,
  Flex
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';

import { Main, Form } from './style';
import {
  useOnlyAuthGuard,
  useLinkUsersCreate,
  useLinkUsersGetByEmail,
  useUserFetchById,
  useLinkUsersDelete
} from '../../hooks';
import { RoutePaths, DancerRole, User } from '../../types';
import { Text, Title } from '../../styles/GlobalStyle';
import UserLevelCard from '../../components/users/level-card'
import { triggerToast } from '../../components/ui';

export default function Settings() {
  const [partner, setPartner] = useState<User | null>(null)
  const { currentUser, isLoading } = useOnlyAuthGuard();
  const { create } = useLinkUsersCreate()
  const { fetch: fetchUserById } = useUserFetchById()
  const { delete: deleteLinkedUser, isLoading: isDeleteLinkUsersLoading } = useLinkUsersDelete()
  const {
    data: linkedUser,
    refetch: refetchLinkedUser,
    status: linkedUsersStatus
  } = useLinkUsersGetByEmail(currentUser)
  const {
    handleChange,
    handleSubmit,
    values,
  } = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async (values, { resetForm }) => {
      if (!currentUser) return

      const partnerToAdd = await fetchUserById(values.email)

      if (!partnerToAdd) {
        triggerToast.error('No dancer found')
        return
      }
      const rolePartnerShouldBe: DancerRole = currentUser.dancerRole === 'leader' ? 'follower' : 'leader'
      if (partnerToAdd.dancerRole !== rolePartnerShouldBe) {
        triggerToast.error('You can not partner with user who has the same role as you')
        return
      }

      await create({ user: currentUser, partnerEmail: values.email })
      resetForm();
      refetchLinkedUser()
    },
  })

  const fetchPartner = useCallback(async (partnerId: string) => {
    const partnerResult = await fetchUserById(partnerId)

    if (partnerResult) {
      setPartner(partnerResult)
    }
  }, [fetchUserById])

  useEffect(() => {
    if (!linkedUser) return

    const partnerUserId = currentUser?.dancerRole === 'leader'
      ? linkedUser.follower
      : linkedUser.leader

    if (!partnerUserId) return

    fetchPartner(partnerUserId)
  }, [currentUser, fetchPartner, linkedUser])


  if (!isLoading && currentUser && !currentUser.dancerRole)
    Router.push(RoutePaths.ONBOARDING);

  return (
    <Main>
      <Button
        leftIcon={<FaArrowLeft />}
        onClick={() => Router.push(RoutePaths.HOME)}
        mb="10px"
      >
        {`Back to home`}
      </Button>
      <Title>My profile</Title>
      <Box borderWidth='1px' borderRadius='8px' p='16px' my='16px'>
        <Text>
          <strong>Email:</strong> {currentUser?.email}
        </Text>
        <Text>
          <strong>Full name:</strong> {currentUser?.fullName}
        </Text>
      </Box>
      <Title>Dance levels</Title>
      <Box borderWidth='1px' borderRadius='8px' p='16px' my='16px'>
        <UserLevelCard levels={currentUser?.levels} />
      </Box>
      <Title>Coming as couple?</Title>
      <TextChakra>
        If you are coming as a couple, you can automatically add your partner with you if your accounts are linked.
      </TextChakra>
      <Box borderWidth='1px' borderRadius='8px' p='16px' my='16px'>
        {renderLinkedUser()}
      </Box>
    </Main>
  );

  function renderLinkedUser() {
    if (linkedUsersStatus === 'idle' || linkedUsersStatus === 'loading') return <>
      <Skeleton w='100%' h='16px' mb='4px' />
      <Skeleton w='100%' h='16px' />
    </>

    if (!linkedUser) {
      return <>
        <Alert status='warning' borderRadius="4px" mb="16px">
          Enter the email of you partner than submit it. You partner will need to confirm your linking request inside his settings. Only then, you will be able to add each other.
        </Alert>
        <Form onSubmit={handleSubmit}>
          <FormLabel>Partner email</FormLabel>
          <Flex gap="16px">
            <Input
              id='mail'
              name='email'
              type='email'
              onChange={handleChange}
              value={values.email}
              placeholder="john@email.com"
            />
            <Button
              type="submit"
            >
              Link
            </Button>
          </Flex>
        </Form>
      </>
    }

    const isCurrentUserLeader = currentUser?.dancerRole === 'leader'
    const partnerShouldAccept = `${partner?.fullName || 'Your partner'} should accept your request`
    const userHaveToAccept = `${partner?.fullName || 'Your partner'} request to link account`

    switch (linkedUser.status) {
      case 'confirmed':
        return <Alert status='success' borderRadius="4px" display="flex" alignItems="center" gap="16px">
          {`You are linked with your partner ${partner?.fullName}, you can subscribe to classes together`}
          {renderCancelRequestButton("Remove link")}
        </Alert>
      case 'requested-by-follower':
        return <>
          <Alert status='info' borderRadius="4px" display="flex" alignItems="center" gap="16px">
            {isCurrentUserLeader ? userHaveToAccept : partnerShouldAccept}
            {renderCancelRequestButton()}
          </Alert>
        </>
      case 'requested-by-leader':
        return <>
          <Alert status='info' borderRadius="4px" display="flex" alignItems="center" gap="16px">
            {isCurrentUserLeader ? partnerShouldAccept : userHaveToAccept}
            {renderCancelRequestButton()}
          </Alert>
        </>
      default:
        return null
    }
  }

  function renderCancelRequestButton(label?: string) {
    return <Button
      type="button"
      variant='link'
      onClick={() => {
        if (!linkedUser) return

        deleteLinkedUser(linkedUser.id)
        refetchLinkedUser()
      }}
      isLoading={isDeleteLinkUsersLoading}
    >
      {label || 'Cancel request'}
    </Button>
  }
}
