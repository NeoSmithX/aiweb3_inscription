import React, { useState } from 'react'
import { Form, Input, Grid, Label, Icon, Dropdown } from 'semantic-ui-react'
import { TxButton } from './substrate-lib/components'
import { useSubstrateState } from './substrate-lib'
const ADMIN_ADDRESS = "5HpNm4YUTLXAqy9wW8XoKqn2sBu21QEuCwUimCndGEA8AHdo"
export default function Web3Party_Admin(props) {
  const [status, setStatus] = useState(null)
  const [formState, setFormState] = useState({ addressTo: '', amount: 0, questionID: '', answer: '' })
// const { api } = useSubstrateState()
  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }))

  const { questionID,answer,addressTo } = formState //addressTo, amount,

  const { keyring } = useSubstrateState()
  const accounts = keyring.getPairs()

  const availableAccounts = []
  accounts.map(account => {
    return availableAccounts.push({
      key: account.meta.name,
      text: account.meta.name,
      value: account.address,
    })
  })

  return (
    <Grid.Column width={8}>
      <h1>问题发布(仅限管理员)/Question_Deploy(Only Admin) </h1>
      <Form>
        <Form.Field>
          <Label basic color="teal">
            <div>
              <Icon name="hand point right" />请管理员使用指定账号发布问题
            </div>
            
          </Label>
          <Label
            basic
            color="teal"
            style={{ marginLeft: 0, marginTop: '.5em' }}
          >
            <div>
              <Icon name="hand point right" />xxx
            </div>
            <div>
              <Icon name="hand point right" />xx
            </div>
          </Label>
        </Form.Field>

        <Form.Field>
          <Dropdown
            placeholder="Select from available addresses"
            fluid
            selection
            search
            options={availableAccounts}
            state="addressTo"
            onChange={onChange}
          />
        </Form.Field>



        {/*  */}
        <Form.Field>
          <Input
            fluid
            label="问题编号/Question_ID"
            type="text"
            placeholder="only Number/只能是数字"
            value={questionID}
            state="questionID"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="你的答案/Your_Answer"
            type="text"
            placeholder="only English/只能是英文"
            value={answer}
            state="answer"
            onChange={onChange}
          />
        </Form.Field>
    
        <Form.Field style={{ textAlign: 'center' }}>
        
          <TxButton
            disabled={addressTo !== ADMIN_ADDRESS}
            label="发布问题/Post_Question"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'system',
              callable: 'remark',
              inputParams: ['{"p":"aiweb3","o":"deployQuestion","questionID":"'+questionID+'"}'],
              paramFields: [true],
            }}
          />
        </Form.Field>
        {/* <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            label="Submit"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'balances',
              callable: 'transfer',
              inputParams: [addressTo, amount],
              paramFields: [true, true],
            }}
          />
        </Form.Field> */}
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  )
}
